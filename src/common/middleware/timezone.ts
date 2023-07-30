import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as moment from 'moment-timezone';

@Injectable()
export class ConvertToUtcTimeMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		if (req.body.timestamp) {
			const localTime = moment.tz(req.body.timestamp, 'Asia/Ho_Chi_Minh'); // Convert to UTC+0
			req.body.timestamp = localTime.toDate();
		}
		next();
	}
}
