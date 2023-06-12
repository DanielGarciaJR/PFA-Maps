export default  {
    content: [
        { 
            id: 'Sewer Manhole', 
            source: 'sewer_manhole-akdqos' , 
            url: 'mapbox://multitaskr.4o584mwn',
            type: 'circle',
            properties: { radius: 3, color: '#864707', strokeColor: '#020201', strokeWidth: 1 }
        },
        { 
            id:'Storm Water',
            source: 'drain_structure-1kis6o', 
            url: 'mapbox://multitaskr.bp8940iq',
            type: 'circle',
            properties: { radius: 4, color: '#f6b6fc', strokeColor: '#020201', strokeWidth: 1 }

        },
        { 
            id: 'Water Hydrants', 
            source: 'water_hydrants_sd-7zs5dq', 
            url: 'mapbox://multitaskr.3tn9w9dx',
            type: 'circle',
            properties: { radius: 3, color: '#d80315', strokeColor: '#020201', strokeWidth: 1 }
        },
        { 
            id: 'Drain Conveyance', 
            source: 'drain_conveyance-03ogid', 
            url: 'mapbox://multitaskr.btfld2ct',
            type: 'line',
            properties: { lineColor : '#eed5fb' , lineWidth: 2, lineDash: [1,0] }
        },
        { 
            id: 'Water Main', 
            source: 'water_main-75owv2', 
            url: 'mapbox://multitaskr.0maz1ai4',
            type: 'line',
            properties: { lineColor : '#6090e1' , lineWidth: 2 , lineDash: [1,0]}
        },
        { 
            id: 'Sewer Main', 
            source: 'sewer_main-2lwed6', 
            url: 'mapbox://multitaskr.5jrwnqm3',
            type: 'line',
            properties: { lineColor : '#898648' , lineWidth: 2 , lineDash: [1,0]}
        },
        {
            id: 'parcels-limit',
            source: 'parcels',
            url: 'mapbox://multitaskr.parcels',
            type: 'line',
            properties: { lineColor: '#740595', lineWidth: 2, lineDash: [2,2]}
        },
        { 
            id: 'Solid Report Conditional', 
            source: 'solid_report_conditional-4381r9', 
            url: 'mapbox://multitaskr.53qdu7rb',
            type: 'fill',
            properties: { color: '#65109e', opacity: 0.39}
        },
        { 
            id: 'Fire Hazard Severity Zones', 
            source: 'fire_hazard_severity_zones-4hkq9b', 
            url: 'mapbox://multitaskr.8s9qvzgx',
            type: 'fill',
            properties: { color: '#b7250b', opacity: 0.39 }
        },
        { 
            id: 'Solid Report Required', 
            source: 'solid_report_required-6pf853', 
            url: 'mapbox://multitaskr.9cu1lnxe',
            type: 'fill',
            properties: { color: '#9895e9', opacity: 0.56 }
        }
    ]
}