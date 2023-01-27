export const mongoConnect = async () => {
    try {
      const mongoose = (await import('mongoose')).default;
      mongoose.set('strictQuery', true);
      await mongoose.connect(process.env.CONNECTION_URL!);
      console.log('connected successfully');
    } catch (error) {
       setTimeout(mongoConnect, 3000);
    }
  };