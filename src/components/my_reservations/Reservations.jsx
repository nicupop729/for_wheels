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
  const path = {
    previous: '/my_reservations',
  };

  return (
    <>
      {!rentals.length ? (
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 mt-20">
          <div className="bg-white px-6 py-8 rounded text-black w-full shadow-md hover:shadow-xl transition duration-700 ">
            <p className="mb-10">No super cars rented yet! Why not renting one?</p>
            <Link
              to="/"
              className="block text-center max-w-sm m-auto rounded-full py-3 bg-green-400 text-gray-700 font-bold hover:text-white transition duration-600"
            >
              Rent a Car
            </Link>
          </div>
        </div>
      ) : (
        rentals.map((rental) => {
          const car = findCar(cars, rental);
          return (
            <li
              key={uuidv4()}
              className="flex flex-col py-8 px-4 mx-auto min-h-full shadow-md hover:shadow-xl transition duration-700 max-w-3xl items-center mb-20"
            >
              <img
                src={findCar(cars, rental).img_url}
                alt=""
                className="inset-0 w-full h-full rounded-lg object-cover"
              />
              <p className="text-xl text-left font-bold my-6">
                {findCar(cars, rental).model}
              </p>
              <div className="w-[100%]">
                <div className="bg-gray-200 flex justify-between px-4 py-3">
                  <span>Pick up date:</span>
                  <span>{convertDate(rental.start_date)}</span>
                </div>
                <div className="bg-white flex justify-between px-4 py-3">
                  <span>Drop off date:</span>
                  <span>{convertDate(rental.end_date)}</span>
                </div>
                <div className="bg-gray-200 flex justify-between px-4 py-3">
                  <span>Total price:</span>
                  <span>{rental.price}</span>
                </div>
              </div>
              <Link
                to="/car"
                state={{ car, path }}
                className="block text-center max-w-sm m-auto rounded-full w-52 px-10 mt-15
                my-4 bg-green-400 text-gray-700 font-bold hover:text-white transition duration-600 py-3"
              >
                Show car details
              </Link>
              <button
                className="p-2 bg-red-500 hover:bg-red-700 w-52 hover:shadow-xl text-gray-100 font-bold hover:text-white transition duration-600 m-auto px-10
                my-4 rounded-full py-3"
                type="submit"
                onClick={() => {
                  dispatch(deleteRental(rental.id));
                }}
              >
                Cancel reservation
              </button>
            </li>
          );
        })
      )}
    </>
  );
};

export default Reservations;
