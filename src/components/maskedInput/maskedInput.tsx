import { IMaskInput, type IMaskInputProps, IMask } from "react-imask";

const PRESETS = {
  dni: {
    mask: Number,
    thousandsSeparator: ".",
    unmask: true,
    min: 1000000,
    max: 99999999,
  },

  toUpperCase: {
    mask: /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]*$/,
    prepare: (str: string, masked: { value: string }) => {
      const isFirst = masked.value.length === 0;
      const isAfterSpace = masked.value.endsWith(" ");

      return isFirst || isAfterSpace ? str.toUpperCase() : str.toLowerCase();
    },
  },
  money: {
    mask: Number,
    scale: 0,
    signed: false,
    thousandsSeparator: ".",
    radix: ",",
    mapToRadix: ["."],
    normalizeZeros: true,
    padFractionalZeros: false,
    min: 0,
    lazy: false,
    unmask: true,
  },
  areaCode: {
    mask: "0000",
    lazy: true,
  },

  phoneNumber: {
    mask: "0000000",
    lazy: true,
  },
  fecha: {
    mask: Date,
    pattern: "d{/}`m{/}`Y",
    lazy: true,
    blocks: {
      d: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 31,
        maxLength: 2,
      },
      m: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
        maxLength: 2,
      },
      Y: {
        mask: IMask.MaskedRange,
        from: 1900,
        to: 2099,
      },
    },
    format: (date: Date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    parse: (str: string) => {
      const [day, month, year] = str.split("/");
      return new Date(Number(year), Number(month) - 1, Number(day));
    },
  },

  hora: {
    mask: "HH:MM",
    lazy: true,
    blocks: {
      HH: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 23,
        maxLength: 2,
      },
      MM: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 59,
        maxLength: 2,
      },
    },
  },
};
type MaskType = keyof typeof PRESETS;

type MaskedInputProps = Omit<IMaskInputProps<HTMLInputElement>, "mask"> & {
  maskType?: MaskType;
};

function MaskedInput({ maskType, ...props }: MaskedInputProps) {
  const config = maskType ? PRESETS[maskType] : {};

  return <IMaskInput {...config} {...props} />;
}
export default MaskedInput;
