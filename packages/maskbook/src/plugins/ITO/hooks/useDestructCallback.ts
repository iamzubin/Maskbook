import { useCallback } from 'react'
import type { TransactionReceipt } from 'web3-core'
import type { NonPayableTx } from '@dimensiondev/contracts/types/types'
import { useAccount } from '../../../web3/hooks/useAccount'
import { TransactionStateType, useTransactionState } from '../../../web3/hooks/useTransactionState'
import { TransactionEventType } from '../../../web3/types'
import { useITO_Contract } from '../contracts/useITO_Contract'
import Services from '../../../extension/service'

export function useDestructCallback() {
    const account = useAccount()
    const ITO_Contract = useITO_Contract()
    const [destructState, setDestructState] = useTransactionState()

    const destructCallback = useCallback(
        async (id: string) => {
            if (!ITO_Contract || !id) {
                setDestructState({
                    type: TransactionStateType.UNKNOWN,
                })
                return
            }

            // start waiting for provider to confirm tx
            setDestructState({
                type: TransactionStateType.WAIT_FOR_CONFIRMING,
            })

            // estimate gas and compose transaction
            const config = await Services.Ethereum.composeTransaction({
                from: account,
                to: ITO_Contract.options.address,
                data: ITO_Contract.methods.destruct(id).encodeABI(),
            }).catch((error: Error) => {
                setDestructState({
                    type: TransactionStateType.FAILED,
                    error,
                })
                throw error
            })

            // send transaction and wait for hash
            return new Promise<string>((resolve, reject) => {
                const onConfirm = (no: number, receipt: TransactionReceipt) => {
                    setDestructState({
                        type: TransactionStateType.CONFIRMED,
                        no,
                        receipt,
                    })
                    resolve(receipt.transactionHash)
                }
                const onFailed = (error: Error) => {
                    setDestructState({
                        type: TransactionStateType.FAILED,
                        error,
                    })
                    reject(error)
                }
                const promiEvent = ITO_Contract.methods.destruct(id).send(config as NonPayableTx)
                promiEvent.on(TransactionEventType.CONFIRMATION, onConfirm).on(TransactionEventType.ERROR, onFailed)
            })
        },
        [ITO_Contract],
    )

    const resetCallback = useCallback(() => {
        setDestructState({
            type: TransactionStateType.UNKNOWN,
        })
    }, [])

    return [destructState, destructCallback, resetCallback] as const
}
