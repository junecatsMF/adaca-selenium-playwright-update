export async function retry(fn, attempts = 3, delay = 1000) {
    for (let i = 0; i < attempts; i++) {
        try {
            return await fn();
        } catch (e) {
            if (i === attempts - 1) throw e;
            console.warn(`[WARN] Attempt ${i + 1} failed. Retrying...`);
            await new Promise(res => setTimeout(res, delay));
        }
    }
}