export default  {
    content: [
        {
            id: 'Parcel Limit',
            url: 'mapbox://multitaskr.parcels',
            type: 'line',
            properties: { lineColor: '#740595', lineWidth: 2, lineDash: [2,2]}
        },
        {
            id: 'Parcel Information',
            url: 'mapbox://multitaskr.parcels',
            type: 'fill',
            properties: { color: '#DFCAEC', opacity: ['case',['boolean', ['feature-state', 'hover'], false],1,0]}
        },
    ]
}

