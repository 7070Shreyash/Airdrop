const {
  Connection,
  LAMPORTS_PER_SOL,
  clusterApiUrl, // whom to connnect
  Keypair, // create public and private key
} = require("@solana/web3.js");

const connection = new Connection(clusterApiUrl("devnet"), "confirmed"); // confirmation of connection

(async () => {
  const keypair = Keypair.generate(); // generate public and private key

  const airdropSignature = await connection.requestAirdrop(
    keypair.publicKey,
    LAMPORTS_PER_SOL // only one sole == one billion lamports (aton)
  );

  const latestBlockHash = await connection.getLatestBlockhash(); // recent transaction

  const txn = await connection.confirmTransaction({
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    signature: airdropSignature,
  });

  console.log({
    publicKey: keypair.publicKey,
    privateKey: keypair.secretKey,
    signature: airdropSignature,
    txn,
  });
})();
