import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { deleteRental } from '../../redux/myReservations/myReservations';

const Reservations = () => {
  const dispatch = useDispatch();
  const { rentals } = useSelector((state) => state.myRentalsReducer);
  const cars = useSelector((state) => state.carsReducer);

  const findCar = (cars, rental) => {
    const car = cars.find((car) => car.id === rental.car_id);
    return car;
  };

  const convertDate = (date) => new Date(date).toLocaleString('en-US');

  return (
    <>
      {!rentals.length ? (
        <p>No cars rented yet! Why not renting one?</p>
      ) : (
        rentals.map((rental) => (
          <li key={uuidv4()}>
            <div className="mb-2">
              <p>
                Car model:
                {findCar(cars, rental).model}
              </p>
              <img src={findCar(cars, rental).img_url} alt="" />
              <p>
                Pick up date:
                {convertDate(rental.start_date)}
              </p>
              <p>
                Drop off date:
                {convertDate(rental.end_date)}
              </p>
              <p>
                Total price:
                {rental.price}
              </p>
              <button
                className="p-2 rounded bg-red-500 text-white"
                type="submit"
                onClick={() => {
                  dispatch(deleteRental(rental.id));
                }}
              >
                Cancel reservation
              </button>
              <Link
                to="/car"
                state={findCar(cars, rental)}
                className="border-solid border-2 border-dark p-2 bg-green-200"
              >
                Show car details
              </Link>
            </div>
          </li>
        ))
      )}
    </>
  );
};

export default Reservations;
