import { Fragment } from "react";
import { useMenuLateral } from "../contexts/AppMenuLateralContext";

export const MenuLateral = () => {
	const { sections } = useMenuLateral();

	return (
		<>
			<nav className="bg-slate-950 pl-5">
				{sections.map((sections, index) =>
					sections.show ? (
						<Fragment key={index}>
							<h2 className="text-gray-200 font-semibold text-lg flex-1">
								{sections.title}
							</h2>
							<ul className="p-2">
								{sections.options.map((option, index) => (
									<li
										className="
                  flex gap-2 items-center hover:bg-slate-700 transition-all p-2 rounded-md
                  divide-y divide-y-reverse divide-slate-700 divide-solid"
										key={index}
									>
										{option.icon}
										<a href={option.path} className="text-gray-200 flex-1">
											{option.label}
										</a>
									</li>
								))}
							</ul>
						</Fragment>
					) : null
				)}
			</nav>
		</>
	);
};
