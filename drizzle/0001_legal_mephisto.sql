PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_documents` (
	`id` text PRIMARY KEY DEFAULT '6013b53a-cf6a-48b3-a771-cf16e717757d' NOT NULL,
	`name` text NOT NULL,
	`path` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_documents`("id", "name", "path", "created_at") SELECT "id", "name", "path", "created_at" FROM `documents`;--> statement-breakpoint
DROP TABLE `documents`;--> statement-breakpoint
ALTER TABLE `__new_documents` RENAME TO `documents`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_knowledgebase` (
	`id` text PRIMARY KEY DEFAULT 'dae2e3e5-ec58-4b1d-b24d-180205e1f2a7' NOT NULL,
	`name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`document_ids` text DEFAULT '[]' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_knowledgebase`("id", "name", "created_at", "document_ids") SELECT "id", "name", "created_at", "document_ids" FROM `knowledgebase`;--> statement-breakpoint
DROP TABLE `knowledgebase`;--> statement-breakpoint
ALTER TABLE `__new_knowledgebase` RENAME TO `knowledgebase`;