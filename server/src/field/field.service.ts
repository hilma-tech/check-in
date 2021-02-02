import { Body, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SaveFieldDto } from "./field.dtos";
import { Field } from "./field.entity";

@Injectable()
export class FieldService {
  constructor(
    @InjectRepository(Field)
    private fieldRepository: Repository<Field>,
  ) { }

  async saveField(@Body() req: SaveFieldDto) {
    req.data.map(async fieldObject => {
      let field = new Field();
      field.field_name = fieldObject.name;
      field.type = fieldObject.selection;
      if (
        fieldObject.selection === "image" ||
        fieldObject.selection === "text"
      ) {
        field.default_value = fieldObject.value[0].value;
      } else {
        field.default_value = JSON.stringify(
          fieldObject.value.map(valField => {
            return valField === null ? "" : valField.value;
          })
        );
      }
      field.order = fieldObject.order;
      field.game = req.id;

      await this.fieldRepository.save(field);
    });
  }

  async deleteField(gameId) {
    let ans = await this.fieldRepository.find({
      relations: ['game'],
      where: { game: gameId}
    });
    if (ans.length>0){
    ans.map((field) => {
      let deleteField= this.fieldRepository.delete(field)
    })}
  }

}

