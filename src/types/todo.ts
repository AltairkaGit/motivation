import { createAssistant, createSmartappDebugger } from '@salutejs/client';

import { InitCommand, InputActionType } from '../scenario/types';

export type Action = {
    type: string;
    payload: Record<string, unknown> | unknown[];
};

export type Assistant = (ReturnType<typeof createAssistant> | ReturnType<typeof createSmartappDebugger>) & {
    sendActionPromisified?: (actionToSend: any) => Promise<InputActionType['payload']>;
};

export type OutputActionType = InitCommand;
