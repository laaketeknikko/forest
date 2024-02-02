import PropTypes from "prop-types"

const TurnOrderCard = ({ imagePath }) => {
   return <img className="turn-order-image" src={imagePath} />
}

TurnOrderCard.propTypes = {
   imagePath: PropTypes.string.isRequired,
}

export { TurnOrderCard }
