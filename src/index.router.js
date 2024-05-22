import adsRouter from './modules/ads/ads.routes.js';
import authRouter from './modules/auth/auth.routes.js';
import requestsRouter from './modules/requests/requests.routes.js';
import userRouter from './modules/user/user.routes.js';
import { globalErrorHandling } from './utils/errorHandling.js';

export function bootstrap(app) {
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/user', userRouter);
  app.use('/api/v1/requests', requestsRouter);
  app.use('/api/v1/ads', adsRouter);

  app.use(globalErrorHandling);
}
