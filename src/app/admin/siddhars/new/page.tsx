import { SiddharForm } from "@/components/admin/SiddharForm";

export default function NewSiddharPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-serif">Add New Siddhar</h1>
                <p className="text-muted-foreground">Create a profile for a Siddhar.</p>
            </div>
            <SiddharForm />
        </div>
    );
}
