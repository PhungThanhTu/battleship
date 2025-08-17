import Indicator from "../../../../shared/indicator/indicator.component";
import "./hidden-cell.style.scss";

type HiddenCellProps = {
    hover?: boolean;
    disabled?: boolean;
};

const defaultHiddenCellProps: HiddenCellProps = {
    hover: false,
    disabled: false
};

function HiddenCell(hiddenCellProps: Readonly<HiddenCellProps>) {
    const { hover, disabled } = { ...defaultHiddenCellProps, ...hiddenCellProps };
    const optionalIndicator = hover && !disabled ? <Indicator /> : null;
    const hoverToggleClassName = hover ? "hover" : "";
    const disabledToggleClassName = disabled ? "disabled" : "";

    return (
        <>
            <div className={`hidden-cell ${hoverToggleClassName} ${disabledToggleClassName}`.trim()}></div>
            {optionalIndicator}
        </>
    );
}

export default HiddenCell;
