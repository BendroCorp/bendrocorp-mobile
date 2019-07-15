export class MyApproval 
{
    id?:number
    approval_id?:number;
    approval_type_id?: number
    approval_type?:ApprovalType
    created_at?: Date
    updated_at?: Date
}

export class Approval
{
    id?: number
    approval_kind_id?: number
    full_consent?: boolean
    denied?: boolean
    approved?: boolean
    created_at?: Date
    updated_at?: Date
    approval_status?: string
    approval_link?: string
    approval_source_requested_item?: string
    approval_source_on_behalf_of?: string

    approval_kind:ApprovalKind
    approval_approver:ApprovalApprover
    approval_source_character_name:string
}

export class ApprovalApprover
{
    id?: number
    approval_id?: number
    user_id?: number
    approval_type_id?: number
    created_at?: Date
    updated_at?: Date
    character_name?: string
    approver_response?: string
    approval_type?: ApprovalType
}

export class ApprovalKind
{
    id?:number;
    title?:string;
}

export class ApprovalType
{
    id?:number;
    title?:string;
    description?:string;
}