import classNames from 'classnames';

type EllipsisColor = 'black' | 'white';
type EllipsisPosition = 'absolute' | 'relative';

interface EllipsisLoadingProps {
  color?: EllipsisColor;
  position?: EllipsisPosition;
}

const EllipsisLoading = ({ color = 'black', position = 'relative' }: EllipsisLoadingProps) => {
  return (
    <div className={classNames('loading', { [`position-${position}`]: position })}>
      <div className={classNames('ellipsis-loading', color)}>
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    </div>
  );
};

export default EllipsisLoading;
