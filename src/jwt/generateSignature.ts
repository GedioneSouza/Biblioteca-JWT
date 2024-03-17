import { createHmac } from "crypto";

interface IGenerateSignature {
    secret: string;
    header: string;
    payload: string;
}

export function generateSignature({
    header,
    payload,
    secret
}: IGenerateSignature) {
    // Signature
    const hmac = createHmac('sha256', secret);

    return hmac.update(`${header}.${payload}`).digest('base64url');
}
