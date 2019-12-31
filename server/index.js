const app = require('./app');

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`BOON server has started on port ${PORT}`);
});
