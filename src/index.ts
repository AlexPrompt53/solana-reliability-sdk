import { Connection, Transaction, TransactionSignature, SendOptions, ComputeBudgetProgram } from '@solana/web3.js';

export class ReliabilityConnection {
    private endpoints: string[];
    private currentIdx: number = 0;

    constructor(endpoints: string[]) {
        this.endpoints = endpoints;
    }

    async sendSmartTransaction(transaction: Transaction, signers: any[], options?: SendOptions): Promise<TransactionSignature> {
        const connection = new Connection(this.endpoints[this.currentIdx]);
        const { value: simulation } = await connection.simulateTransaction(transaction);
        if (simulation.err) {
            throw new Error(`Simulation failed: ${JSON.stringify(simulation.err)}`);
        }
        transaction.add(ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 1000 }));
        try {
            return await connection.sendTransaction(transaction, signers, options);
        } catch (e) {
            this.currentIdx = (this.currentIdx + 1) % this.endpoints.length;
            const fallbackConn = new Connection(this.endpoints[this.currentIdx]);
            return await fallbackConn.sendTransaction(transaction, signers, options);
        }
    }
}
