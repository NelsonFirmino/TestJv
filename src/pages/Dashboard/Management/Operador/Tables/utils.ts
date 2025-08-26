import { subOptionsI } from "../../../../../components/JvrisTable/components/ClicableButton/ClicableButton.interface";
import { createSubOptI } from "./AguardandoCiencia/interfaces";

export function createSubOptions(
	props: createSubOptI[][],
) {
	const proc: subOptionsI[][] = [];
	props.forEach((subOpt) => {
		const subOptions: subOptionsI[] = [];
		subOpt.forEach((opt) => {
			subOptions.push({
				text: opt.option,
				onClick: (index) => {
					if (index != undefined) {
						if (opt.onClick)
							opt.onClick(index);
					}
				},
			});
		});
		proc.push(subOptions);
	});

	return proc;
}
