import { ApiProperty } from "@nestjs/swagger"

export class CreateBookDto {
  @ApiProperty()
  readonly title: string
  
  @ApiProperty()
  readonly count: number
}