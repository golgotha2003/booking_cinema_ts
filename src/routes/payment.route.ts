import { Request, Response, NextFunction, Router } from "express";
import paymentController from "../controllers/payment.controller";

const router = Router();

router.post('/payment', async (req: Request, res: Response, next: NextFunction) => {
    await paymentController.processPayment(req, res).catch(next);
});

router.get('/get-payment-by-ticket-id/:id', async (req: Request, res: Response, next: NextFunction) => {
    await paymentController.getPaymentByTicketId(req, res).catch(next);
});

router.put('/refund-payment', async (req: Request, res: Response, next: NextFunction) => {
    await paymentController.refundPayment(req, res).catch(next);
});

export default router;