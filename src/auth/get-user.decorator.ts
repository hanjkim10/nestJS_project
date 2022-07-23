import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./user.entity";

export const GetUser = createParamDecorator((data, ctxt: ExecutionContext): User => {
    const req = ctxt.switchToHttp().getRequest()
    return req.user
})