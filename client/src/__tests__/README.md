# App tests

Large test scenarios testing the whole `App` component.

Due to some limitations / bugs of the `react-testing-library`, each test scenario
must be put in a separate file (otherwise, the rendered element lives across test
cases). Group similar test scenarios into test cases once the problem is gone.
