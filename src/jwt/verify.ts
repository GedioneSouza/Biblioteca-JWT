import { generateSignature } from "./generateSignature";

interface IVerifyOptions {
    token: string;
    secret: string;
}

export function verify({  token, secret }: IVerifyOptions) {
    const [heanderSent, payloadSent, signatureSent] = token.split('.');

    const signature = generateSignature({
        header: heanderSent,
        payload: payloadSent,
        secret
    })

    if (signature !== signatureSent) {
        throw new Error('Invalid KWT token.')
    }

    const decodedPayload = JSON.parse(
        Buffer
            .from(payloadSent, 'base64url')
            .toString('utf-8')
    )


    if (decodedPayload.exp < Date.now()) {
        throw new Error('Expired token.')
    }

    return decodedPayload
}
