import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | Manage your application settings",
  description: "Manage your application settings",
};

export default function SettingsPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your application settings and configurations.
        </p>
      </div>
    </div>
  );
}
