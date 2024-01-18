import AppLayout from '../layouts/AppLayout';

export const Team: React.FC = () => {
    return (
        <AppLayout
            appBar={true}
            navPanel={{
                side: 'left',
                content: [{ header: 'Navigation', list: [{ id: '', name: `Back to home`, path: '/' }] }],
            }}
        >
            <div style={{ margin: '0 5em' }}>Teams overview will go here</div>
        </AppLayout>
    );
};
