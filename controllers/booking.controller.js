const Booking = require('../models/booking.model');
const Vehicle = require('../models/vehicle.model');

const bookingController = {
    // Crear una nueva reserva
    createBooking: async (req, res) => {
        try {
            const { vehicle, startDate, endDate, price, discount } = req.body;

            // Verificar disponibilidad del vehículo
            const vehicleAvailable = await Vehicle.findById(vehicle);
            if (!vehicleAvailable.available) {
                return res.status(400).json({ message: 'Vehículo no disponible' });
            }

            const newBooking = new Booking({
                user: req.user._id,
                vehicle,
                startDate,
                endDate,
                price,
                discount
            });

            await newBooking.save();

            // Actualizar la disponibilidad del vehículo
            await Vehicle.findByIdAndUpdate(vehicle, { available: false });

            res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear la reserva', error: error.message });
        }
    },

    // Obtener reservas por usuario
    getBookingsByUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const bookings = await Booking.find({ user: userId }).populate('vehicle').populate('user');

            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las reservas', error: error.message });
        }
    },

    // Obtener una reserva específica
    getBooking: async (req, res) => {
        try {
            const { id } = req.params;
            const booking = await Booking.findById(id).populate('vehicle').populate('user');

            if (!booking) {
                return res.status(404).json({ message: 'Reserva no encontrada' });
            }

            res.status(200).json(booking);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener la reserva', error: error.message });
        }
    },

    // Obtener todas las reservas
    getAllBookings: async (req, res) => {
        try {
            const bookings = await Booking.find().populate('vehicle').populate('user');

            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las reservas de los usuarios', error: error.message });
        }
    },

    // Cancelar una reserva
    cancelBooking: async (req, res) => {
        try {
            const { id } = req.params;

            const booking = await Booking.findById(id);
            if (!booking) {
                return res.status(404).json({ message: 'Reserva no encontrada' });
            }

            // Actualizar la disponibilidad del vehículo
            await Vehicle.findByIdAndUpdate(booking.vehicle, { available: true });

            await Booking.findByIdAndDelete(id);

            res.status(200).json({ message: 'Booking cancelled successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error al cancelar la reserva', error: error.message });
        }
    },

    updateBookingDates: async (req, res) => {
        try {
          const { id } = req.params;
          const { startDate, endDate } = req.body;
    
          // Busca la reserva por su ID y actualiza las fechas
          const updatedBooking = await Booking.findByIdAndUpdate(id, { startDate, endDate }, { new: true });
    
          // Verifica si la reserva se actualizó correctamente
          if (!updatedBooking) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
          }
    
          // Envia una respuesta con la reserva actualizada
          res.status(200).json({ message: 'Fechas de reserva actualizadas correctamente', booking: updatedBooking });
        } catch (error) {
          // Captura de error y envioa respuesta de error al cliente
          res.status(500).json({ message: 'Error al actualizar las fechas de reserva', error: error.message });
        }
      },
};

module.exports = bookingController;