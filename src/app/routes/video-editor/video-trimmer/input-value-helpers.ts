import type { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { parseNumber } from "@app/util";

export enum InputName {
    From = 'from',
    To = 'to'
};

export type FormControls<TControl> = {
    readonly [InputName.From]: TControl;
    readonly [InputName.To]: TControl;
};

export const inputValueNormalizer = <TRawValue extends string>({
    inputName,
    formGroup,
    getValue
}: {
    readonly inputName: InputName;
    readonly formGroup: FormGroup<FormControls<FormControl>>;
    readonly getValue: (value: string) => string | number;
}) => (formControls: Partial<FormControls<TRawValue | null>>) => {
    const formControl = formGroup.get(inputName);
    if (!formControl || !formControls[inputName]) {
        return;
    }

    const value = parseNumber(formControls[inputName]!);
    if (!value) {
        return formControl.setValue('');
    }

    formControl.setValue(getValue(value));
};

export const formValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    const [from, to] = [
        InputName.From,
        InputName.To
    ].map(inputName => control.get(inputName));

    if (!from && !to) {
        return null;
    }

    const [fromValue, toValue] = [
        from!.value,
        to!.value
    ].map(value => String(value).trim());

    if (!fromValue && !toValue) {
        return {
            missingValues: true
        };
    }

    if (
        (Number(fromValue) === Number(toValue)) ||
        (toValue && (Number(fromValue) > Number(toValue)))
    ) {
        return {
            invalidOrder: true
        };
    }

    return null;
};
