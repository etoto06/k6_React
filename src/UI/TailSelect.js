
export default function TailSelect({ handleClick, ops, sRef, opDef }) {

    const opTags = ops.map(item =>
        <option key={item}>{item}</option>
    )

    return (
        <select id="sel"
            onChange={handleClick}
            ref={sRef}
            className="w-full bg-gray-50 border
            border-gray-300 text-gray-900 text-sm 
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500 
            block p-2.5">
            <option value='' defaultValue>{opDef}</option>
            {opTags}
        </select>
    )
}
