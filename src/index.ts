const hashAlgorithms = {
  sha1: "SHA-1",
  sha256: "SHA-256",
  sha512: "SHA-512",
} as const;

type HashAlgorithms = keyof typeof hashAlgorithms;

function bufferEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

async function createHmac(algorithm: HashAlgorithms, key: string) {
  if (!hashAlgorithms[algorithm])
    throw new Error(`Algoritm ${algorithm} is not supported`);

  const hmacKey = new TextEncoder().encode(key);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    hmacKey,
    { name: "HMAC", hash: { name: hashAlgorithms[algorithm] } },
    true,
    ["sign"]
  );

  return {
    update: async (data: string) => {
      const dataBuffer = new TextEncoder().encode(data);
      const hmac = await crypto.subtle.sign("HMAC", cryptoKey, dataBuffer);
      return new Uint8Array(hmac);
    },
  };
}

export async function timeSafeCompare(a: string, b: string): Promise<boolean> {
  const sa = String(a);
  const sb = String(b);
  const key = crypto.randomUUID();

  const hmac = await createHmac("sha256", key);

  const [ah, bh] = await Promise.all([hmac.update(sa), hmac.update(sb)]);
  return bufferEqual(ah, bh) && a === b;
}
