import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Plus,
  MoreVertical,
  BarChart2,
  List,
  Clock,
  Filter,
  Edit,
  GripVertical,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Define stages with ids and titles
const pipelineStages = [
  {
    id: "qualified",
    title: "Qualified",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    id: "contact",
    title: "Contact Made",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  {
    id: "demo",
    title: "Viewing Scheduled",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  {
    id: "proposal",
    title: "Offer Made",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  {
    id: "negotiation",
    title: "Under Contract",
    color: "bg-green-100 text-green-800 border-green-200",
  },
];

// Real estate deals per stage
const initialDeals = {
  qualified: [
    {
      id: "deal1",
      name: "Downtown Luxury Condo",
      company: "Urban Living Properties",
      amount: "750,000€",
    },
    {
      id: "deal2",
      name: "Suburban Family Home",
      company: "Greenfield Realty",
      amount: "450,000€",
    },
    {
      id: "deal3",
      name: "Beachfront Villa",
      company: "Coastal Estates",
      amount: "1,200,000€",
    },
    {
      id: "deal4",
      name: "Historic Townhouse",
      company: "Heritage Properties",
      amount: "650,000€",
    },
  ],
  contact: [
    {
      id: "deal5",
      name: "Mountain Retreat",
      company: "Alpine Realty",
      amount: "890,000€",
    },
    {
      id: "deal6",
      name: "City Center Penthouse",
      company: "Metro Living",
      amount: "1,500,000€",
    },
    {
      id: "deal7",
      name: "Rural Farmhouse",
      company: "Countryside Properties",
      amount: "320,000€",
    },
  ],
  demo: [
    {
      id: "deal8",
      name: "Waterfront Apartment",
      company: "Marina View Realty",
      amount: "950,000€",
    },
    {
      id: "deal9",
      name: "Golf Community Villa",
      company: "Fairway Estates",
      amount: "1,100,000€",
    },
  ],
  proposal: [
    {
      id: "deal10",
      name: "Tech Park Office Space",
      company: "Commercial Holdings",
      amount: "2,700,000€",
    },
  ],
  negotiation: [
    {
      id: "deal11",
      name: "Lakeside Mansion",
      company: "Prestige Properties",
      amount: "3,200,000€",
    },
    {
      id: "deal12",
      name: "Vineyard Estate",
      company: "Luxury Vineyards",
      amount: "4,500,000€",
    },
  ],
};

const totalAmount =
  Object.values(initialDeals)
    .flat()
    .reduce((sum, deal) => sum + parseInt(deal.amount.replace(/[^\d]/g, "")), 0)
    .toLocaleString("en") + "€";

const dealCount = Object.values(initialDeals).flat().length;

// Component for deal cards
function DealCard({
  deal,
  listeners,
  attributes,
  setNodeRef,
  transform,
  transition,
  dragging,
  status,
  statusColor,
}) {
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: dragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-white rounded-xl shadow p-3 mb-3 border border-gray-200 cursor-move relative"
    >
      <GripVertical
        size={16}
        className="text-gray-400 absolute top-2 right-2"
      />
      <h3 className="font-semibold text-gray-800">{deal.name}</h3>
      <p className="text-sm text-gray-500">{deal.company}</p>
      <p className="mt-1 text-green-600 font-semibold">{deal.amount}</p>
      {status && (
        <p
          className={`text-xs mt-1 px-2 py-0.5 rounded inline-block ${statusColor}`}
        >
          Status: {status}
        </p>
      )}
    </div>
  );
}

// Wrapper to make deal sortable
function SortableDeal({ deal, status, statusColor }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: deal.id });

  return (
    <DealCard
      deal={deal}
      listeners={listeners}
      attributes={attributes}
      setNodeRef={setNodeRef}
      transform={transform}
      transition={transition}
      dragging={isDragging}
      status={status}
      statusColor={statusColor}
    />
  );
}

// Column representing a stage
function Column({ stage, deals }) {
  const statusColor =
    pipelineStages.find((s) => s.id === stage.id)?.color ||
    "bg-blue-100 text-blue-800 border-blue-200";

  
  
  return (
    <div className="bg-gray-50 rounded-xl p-4 shadow border border-gray-200 min-h-[200px]">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-gray-700">{stage.title}</h2>
        <MoreVertical
          size={18}
          className="text-gray-400 cursor-pointer hover:text-gray-600"
        />
      </div>
      <SortableContext
        items={deals.map((d) => d.id)}
        strategy={rectSortingStrategy}
      >
        {deals.map((deal) => (
          <SortableDeal
            key={deal.id}
            deal={deal}
            status={stage.title}
            statusColor={statusColor}
          />
        ))}
      </SortableContext>
      <button className="w-full mt-2 py-2 text-gray-500 hover:text-gray-700 text-sm flex items-center justify-center gap-1">
        <Plus size={16} /> Add deal
      </button>
    </div>
  );
}

// Deal Form Component
function DealForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    amount: "",
    status: "qualified", // Default status
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Property</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Property Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Agency/Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Price (€)
            </label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g. 500,000"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              {pipelineStages.map((stage) => (
                <option key={stage.id} value={stage.id}>
                  {stage.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Add Deals
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main SalesPipeline component
export default function SalesPipeline() {
  const [deals, setDeals] = useState(initialDeals);
  const [activeId, setActiveId] = useState(null);
  const [showDealForm, setShowDealForm] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const findContainer = (id) => {
    return Object.keys(deals).find((key) =>
      deals[key].some((item) => item.id === id)
    );
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = findContainer(active.id);
    const overContainer = over?.id && findContainer(over.id);

    if (!activeContainer || !overContainer || activeContainer === overContainer)
      return;

    const activeItem = deals[activeContainer].find(
      (item) => item.id === active.id
    );
    setDeals((prev) => {
      const newSource = prev[activeContainer].filter(
        (item) => item.id !== active.id
      );
      const newDestination = [...prev[overContainer], activeItem];

      return {
        ...prev,
        [activeContainer]: newSource,
        [overContainer]: newDestination,
      };
    });
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
  };

  const handleAddDeal = () => {
    setShowDealForm(true);
  };

  const handleSubmitDeal = (dealData) => {
    const newDeal = {
      id: `deal${Date.now()}`, // Generate unique ID
      name: dealData.name,
      company: dealData.company,
      amount: `${dealData.amount}€`,
    };

    setDeals((prev) => ({
      ...prev,
      [dealData.status]: [...prev[dealData.status], newDeal],
    }));
  };

  const activeDeal = activeId
    ? Object.values(deals)
        .flat()
        .find((d) => d.id === activeId)
    : null;

  const getStatusColor = (containerId) => {
    const stage = pipelineStages.find((s) => s.id === containerId);
    return stage ? stage.color : "bg-blue-100 text-blue-800 border-blue-200";
  };

  const navigate = useNavigate();
  

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Top header */}
      <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-lg shadow-sm">
        <div className="flex border rounded-md overflow-hidden">
          <button className="p-2 border-r hover:bg-gray-200">
            <BarChart2 size={18} className="text-gray-600" />
          </button>
          <button
            onClick={() => navigate("/listingpage")}
            className="p-2 border-r hover:bg-gray-200"
          >
            <List size={18} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-200">
            <Clock size={18} className="text-gray-600" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="font-semibold text-gray-800">
            {totalAmount} · {dealCount} properties
          </div>

          <div className="flex border rounded-md overflow-hidden">
            <button className="p-2 border-r hover:bg-gray-200">
              <Filter size={18} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-200">
              <Edit size={18} className="text-gray-600" />
            </button>
          </div>

          <button
            onClick={handleAddDeal}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
          >
            <Plus size={18} /> Deals
          </button>
        </div>
      </div>

      {/* Drag and drop area */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {pipelineStages.map((stage) => (
            <Column key={stage.id} stage={stage} deals={deals[stage.id]} />
          ))}
        </div>

        <DragOverlay>
          {activeDeal && (
            <DealCard
              deal={activeDeal}
              dragging
              status={
                findContainer(activeDeal.id) &&
                pipelineStages.find(
                  (stage) => stage.id === findContainer(activeDeal.id)
                )?.title
              }
              statusColor={getStatusColor(findContainer(activeDeal.id))}
            />
          )}
        </DragOverlay>
      </DndContext>

      {/* Deal Form Modal */}
      {showDealForm && (
        <DealForm
          onClose={() => setShowDealForm(false)}
          onSubmit={handleSubmitDeal}
        />
      )}
    </div>
  );
}
