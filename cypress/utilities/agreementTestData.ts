/**
 * Random value generators for agreement form test data.
 * Use these in tests to avoid hardcoded values and reduce collisions.
 */

const randomId = (): string => Math.random().toString(36).slice(2, 10);

/**
 * Generates a random agreement name (e.g. "Agreement Name a1b2c3d4").
 */
export function randomAgreementName(): string {
    return `Agreement Name ${randomId()}`;
}

/**
 * Generates a random date in MM/DD/YY format within a reasonable range.
 */
export function randomAgreementDate(): string {
    const year = 95 + Math.floor(Math.random() * 30); // 1995-2024 as 2-digit
    const month = String(1 + Math.floor(Math.random() * 12)).padStart(2, '0');
    const day = String(1 + Math.floor(Math.random() * 28)).padStart(2, '0');
    return `${month}/${day}/${year}`;
}

/**
 * Generates random notes text.
 */
export function randomAgreementNotes(): string {
    const words = ['notes', 'comment', 'detail', 'info', 'remark', 'memo'];
    const count = 2 + Math.floor(Math.random() * 4);
    const parts: string[] = [];
    for (let i = 0; i < count; i++) {
        parts.push(words[Math.floor(Math.random() * words.length)]);
    }
    return parts.join(' ') + ' ' + randomId();
}

/**
 * Generates a random responsible party label.
 */
export function randomResponsibleParty(): string {
    return `Responsible Party ${randomId()}`;
}

/**
 * Generates a random maintenance owner responsibility text.
 */
export function randomMaintenanceOwnerResponsibility(): string {
    return `Maintenance owner responsibility ${randomId()}`;
}

/**
 * Generates a random maintenance reasoning text.
 */
export function randomMaintenanceReasoning(): string {
    return `Maintenance reasoning ${randomId()}`;
}
