// Suggested code may be subject to a license. Learn more: ~LicenseLog:372837407.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3818967533.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3391065727.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:957873697.

import { networkInterfaces } from 'os';

export async function getLocalExternalIP(): Promise<string> {
    const nets = networkInterfaces();
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]!) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    throw new Error('Unable to find local external IP address');
}
