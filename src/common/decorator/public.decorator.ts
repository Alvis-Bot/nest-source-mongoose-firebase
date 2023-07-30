import { SetMetadata } from '@nestjs/common';
import 'reflect-metadata';
import { Prefix } from '../configs/prefix.config';
export const PUBLIC_KEY = 'IS_PUBLIC';
export function Public() {
	return function (target: any, key?: string, descriptor?: any) {
		if (!key) {
			for (const keyOf in target) {
				Reflect.defineMetadata(PUBLIC_KEY, true, target, keyOf);
				target[Prefix.ACCESS + keyOf] = true;
				SetMetadata(PUBLIC_KEY, true)(target, keyOf, descriptor);
			}
		} else {
			Reflect.defineMetadata(PUBLIC_KEY, true, target, key);
			target[Prefix.ACCESS + key] = true;
			SetMetadata(PUBLIC_KEY, true)(target, key, descriptor);
		}
	};
}
