import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Coupon from '../models/couponModel.js';
import { isAdmin, isAuth} from '../utils.js';

const couponRouter = express.Router();

couponRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const coupons = await Coupon.find({})      
    res.send(coupons);
  })
);


couponRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const coupon = await Coupon.findById(req.params.id);
    if (coupon) {
      res.send(coupon);
    } else {
      res.status(404).send({ message: 'Coupon Not Found' });
    }
  })
);



couponRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const coupon = new Coupon({
        title: 'coupon name' + Date.now(),
        code: 'coupon code' + Date.now(),
        amount_percent: 10
      });
      const createdCoupon = await coupon.save();
      res.send({ message: 'Coupon Created', coupon: createdCoupon });
    })
  );



couponRouter.put(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const couponId = req.params.id;
    const coupon = await Coupon.findById(couponId);
    if (coupon) {
      coupon.title = req.body.title;
      coupon.code = req.body.code;
      coupon.amount_percent = req.body.amount_percent;
      const updatedCoupon = await coupon.save();
      res.send({ message: 'Coupon Updated', coupon: updatedCoupon });
    } else {
      res.status(404).send({ message: 'Coupon Not Found' });
    }
  })
);

couponRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const coupon = await Coupon.findById(req.params.id);
    if (coupon) {
      const deleteCoupon = await coupon.remove();
      res.send({ message: 'coupon Deleted', coupon: deleteCoupon });
    } else {
      res.status(404).send({ message: 'Coupon Not Found' });
    }
  })
);

export default couponRouter;
