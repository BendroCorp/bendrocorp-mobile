import { Approval } from './approval.model';

export class ApprovalRequest
{
    // normally user, approval, object
    approval:Approval
}

export class AddRoleRequest
{
    on_behalf_of_id:number
    role_id:number
}

export class RemoveRoleRequest
{
    on_behalf_of_id:number
    role_id:number
}

export class PositionChangeRequest
{
    job_id?:number
    character_id?:number
}