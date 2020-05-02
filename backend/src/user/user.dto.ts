import { IsOptional, IsString } from 'class-validator';

class CreateUserDto {
    @IsString()
    public username: string;

    @IsString()
    public userType: string;

    @IsString()
    public firstName: string;

    @IsString()
    public lastName: string;

    @IsString()
    public password: string;

    @IsOptional()
    public visits?: [];

    @IsOptional()
    public lastLogged?: string[];

    @IsOptional()
    public npi?: number;

    @IsOptional()
    public specialty?: string;

    @IsOptional()
    public city?: string;

    @IsOptional()
    public profilePic?: string;

    @IsOptional()
    public rates?: any[];

    @IsOptional()
    public rating?: number;

}

export default CreateUserDto;