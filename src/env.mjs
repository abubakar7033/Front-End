import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({


  NODE_ENV: z.enum(['development', 'test', 'production']),

  client: {
    NEXT_PUBLIC_BACKEND_URL: z.string().optional(),
    NEXT_PUBLIC_APP_NAME: z.string().optional(),
    NEXT_PUBLIC_GOOGLE_MAP_API_KEY: z.string().optional(),
  },
  runtimeEnv: process.env,
});
