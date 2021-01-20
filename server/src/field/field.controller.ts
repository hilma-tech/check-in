import { Controller} from "@nestjs/common";
import { FieldService } from "./field.service";

@Controller("api/field")
export class FieldController {
  constructor(
    private fieldService: FieldService
    ) { }
}
