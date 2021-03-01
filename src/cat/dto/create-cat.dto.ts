import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { CatColor } from "src/utils/constants";

export class CreateCatDto {
    @ApiProperty()
    @IsNotEmpty({message: "name không được rỗng"})
    readonly name: string;
    
    @ApiPropertyOptional({enum: CatColor})
    @IsEnum(CatColor)
    readonly color?: CatColor;
}
