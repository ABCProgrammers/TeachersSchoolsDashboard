import { OnlyNumberDirective } from "./only-number.directive";
import { DisableFormControlDirective } from "./disable-control.directive";
import { AlphabetOnlyDirective } from "./alphabet-only.directive";
import { ArabicOnlyDirective } from "./arabic-only.directive";
import { EngOnlyDirective } from "./eng-only.directive";
import { DecimalNumberDirective } from "./decimal-number.directive";
import { NumberOnlyDirective } from "./numbers-only.directive";
import { AlphaNumericDirective } from "./alpha-numeric.directive";
import { NonArabicOnlyDirective } from "./nonArabic.directive";
import { NonEnglisOnlyDirective } from "./nonEnglish.directive";
import { TableAdvancedColumnDirective } from "../components/table-advanced/table-advanced.directives";

export const sharedDirectives = [
  DisableFormControlDirective,
  OnlyNumberDirective,
  AlphabetOnlyDirective,
  ArabicOnlyDirective,
  EngOnlyDirective,
  DecimalNumberDirective,
  NumberOnlyDirective,
  AlphaNumericDirective,
  NonArabicOnlyDirective,
  NonEnglisOnlyDirective,
  TableAdvancedColumnDirective,
];
