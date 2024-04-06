import type {
    AbstractControl,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn
} from "@angular/forms";
import { parseNumber } from "@app/util";

export enum InputName {
    From = 'from',
    To = 'to'
};

export type Value = string | number;

export type FormControls<TControl> = {
    readonly [InputName.From]: TControl;
    readonly [InputName.To]: TControl;
};

export type MinMaxRange = {
    readonly min: number;
    readonly max: number;
};

export const inputValueNormalizer = <TRawValue extends string>({
    inputName,
    formGroup,
    getValue
}: {
    readonly inputName: InputName;
    readonly formGroup: FormGroup<FormControls<FormControl>>;
    readonly getValue: (value: string) => Value;
}) => (formControls: Partial<FormControls<TRawValue | null>>) => {
    const formControl = formGroup.get(inputName);
    if (!formControl) {
        return;
    }

    if (!formControls[inputName]) {
        return formControl.setValue(formControls[inputName] ?? '');
    }

    const value = parseNumber(formControls[inputName]!);
    if (!value) {
        return formControl.setValue('');
    }

    formControl.setValue(getValue(value));
};

export const formValidator = <TComponent extends MinMaxRange>(component: TComponent): ValidatorFn => (
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
        isRangeValuesEqual([fromValue, toValue]) ||
        isLowerRangeValueHigher([fromValue, toValue]) ||
        isRangeValuesEqualMinMaxConstraint([fromValue, toValue], component)
    ) {
        return {
            invalidOrder: true
        };
    }

    return null;
};

function isRangeValuesEqual([fromValue, toValue]: [Value, Value]): boolean {
    return Object.is(Number(fromValue), Number(toValue));
}

function isLowerRangeValueHigher([fromValue, toValue]: [Value, Value]): boolean {
    return Boolean(toValue && (Number(fromValue) > Number(toValue)));
}

function isRangeValuesEqualMinMaxConstraint<TComponent extends MinMaxRange>(
    [fromValue, toValue]: [Value, Value],
    { min, max }: TComponent
): boolean {
    return (
        Object.is(Number(fromValue), min) &&
        Object.is(Number(toValue), max)
    );
}
