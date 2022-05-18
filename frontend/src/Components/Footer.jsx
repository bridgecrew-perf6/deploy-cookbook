import classNames from 'classnames';

function Footer (props) {
  require ('typeface-quicksand');

  return (
    <div
      class={classNames (
        'flex',
        'fixed',
        'bottom-0',
        'w-full',
        'mt-auto',
        `bg-gradient-to-r from-${props.bgcolor}-300 via-${props.bgcolor}-500 to-${props.bgcolor}-700`
      )}
    >
      <h4 className="font-QuickSand tracking-tight font-medium ml-auto mr-auto">
        {' '}
        {props.data.Footer}{' '}
      </h4>
    </div>
  );
}
export default Footer;
