import { UserDto } from '../../../user/domain/UserDto';

export class BuildPayloadCommand {
    constructor(
        public readonly user: UserDto
    ) {
    }
}