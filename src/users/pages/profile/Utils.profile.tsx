import OutlinedHandHeart from "@icons/OutlinedHandHeart";
import TransitIcon from "@/common/icons/Home";
import TransportIcon from "@icons/CarFront";
import type { RoleName } from "@/users/app/types/User.types";
import type { ComponentType, SVGProps } from "react";

export type RoleInformation = {
    name: RoleName;
    description: string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const rolesInformation: Record<RoleName, RoleInformation> = {
    "Rescatista": {
        name: "Rescatista",
        description: "Como rescatista, sos quien encuentra, asiste y da visibilidad a animales en situación de calle, abandono o peligro. Podés publicar tus casos para que la comunidad pueda ayudar y crear campañas o colectas para recaudar fondos destinados a su cuidado.",
        Icon: OutlinedHandHeart,
    },
    "Hogar de tránsito": {
        name: "Hogar de tránsito",
        description: "Como hogar de tránsito ofrecés un espacio temporal y seguro para animales que aún no tienen un hogar definitivo, cuidándolos mientras esperan su adopción.",
        Icon: TransitIcon,
    },
    "Transportista": {
        name: "Transportista",
        description: "Como transportista, ayudás a trasladar animales de forma segura: desde el lugar del rescate hacia veterinarias, hogares de tránsito o su nuevo hogar definitivo. Cuando se necesite un traslado urgente, vas a recibir una notificación desde la app, y sos vos quien decide si podés tomarlo o no según tu disponibilidad.",
        Icon: TransportIcon,
    },
};
