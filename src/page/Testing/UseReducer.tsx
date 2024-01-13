import { FunctionComponent, useEffect, useReducer } from "react";
import { PageLayout } from "../../layout/PageLayout";

enum CountActionEnum {
	increment = "increment",
	decrement = "decrement",
}

interface CountAction {
	type: CountActionEnum;
	payload: number;
}

interface CountState {
	count: number;
}

const reducer = (state: CountState, action: CountAction) => {
	const { type, payload } = action;

	switch (type) {
		case CountActionEnum.increment:
			return {
				...state,
				value: state.count + payload,
			};
		case CountActionEnum.decrement:
			return {
				...state,
				value: state.count - payload,
			};
		default:
			return state;
	}
};

interface LoadingState {
	loaded: boolean;
	loading: boolean;
	error: Error | null;
}

export const LoadingComponent: FunctionComponent = () => {
	const [state, setState] = useReducer(
		(state: LoadingState, newState: Partial<LoadingState>) => ({
			...state,
			...newState,
		}),
		{
			loaded: false,
			loading: false,
			error: null,
		}
	);
	useEffect(() => {
		setState({ loading: true });
		setState({ loading: false, loaded: true });
		setState({ loading: false, loaded: true, error: new Error() });
	}, []);

	if (state.loading) {
		return <p>Loading</p>;
	}

	console.log(state);

	return <>{state.loading ? <p>Loading</p> : <p>{state.loaded}</p>}</>;
};

function UseReducer() {
	const [state, dispath] = useReducer(reducer, { count: 0 });

	console.log(state.count);

	return (
		<PageLayout title="Usando o useReducer">
			<div>
				<h1>Count: {state.count}</h1>
				<LoadingComponent />
				<div className="gap-2 flex ml-2">
					<button
						className="bg-slate-900 text-white px-6 py-2 font-bold rounded-md"
						onClick={() =>
							dispath({ type: CountActionEnum.decrement, payload: 5 })
						}
					>
						-
					</button>
					<button
						className="bg-slate-900 text-white px-6 py-2 font-bold rounded-md"
						onClick={() =>
							dispath({ type: CountActionEnum.increment, payload: 5 })
						}
					>
						+
					</button>
				</div>
			</div>
		</PageLayout>
	);
}

export default UseReducer;
