PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_documents` (
	`id` text PRIMARY KEY DEFAULT '4f3c79c9-9cea-4854-a501-29e81c97423b' NOT NULL,
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
	`id` text PRIMARY KEY DEFAULT '1ab8d743-ef72-4d72-97a0-dcfe920780bf' NOT NULL,
	`name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`document_ids` text DEFAULT '[]' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_knowledgebase`("id", "name", "created_at", "document_ids") SELECT "id", "name", "created_at", "document_ids" FROM `knowledgebase`;--> statement-breakpoint
DROP TABLE `knowledgebase`;--> statement-breakpoint
ALTER TABLE `__new_knowledgebase` RENAME TO `knowledgebase`;