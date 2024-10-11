import { Icon } from "./Icon";

export type SpinProps = {
	spinning?: boolean;
	children?: React.ReactNode;
	asChild?: boolean;
};

export const Spin = (props: SpinProps) => {
	const { spinning = true, asChild = false, children } = props;
	const comp = asChild ? (
		<>
			{spinning && (
				<div className="flex items-center justify-center h-full absolute top-0 left-0 right-0 bottom-0 bg-secondary/80">
					<Icon name="Loader" className="animate-spin" />
				</div>
			)}
			{children}
		</>
	) : (
		<div className="relative">
			{spinning && (
				<div className="flex items-center justify-center h-full absolute top-0 left-0 right-0 bottom-0 bg-secondary/80">
					<Icon name="Loader" className="animate-spin" />
				</div>
			)}
			{children}
		</div>
	);
	return comp;
};
